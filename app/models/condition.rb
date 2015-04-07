require 'set'

class Condition < ActiveRecord::Base
  has_and_belongs_to_many :trials

  def self.search(query)
    condition = Condition.where(Condition.arel_table[:name].matches(query.downcase))
    trials = condition.map do |c|
      c.trials
    end
    exclusions = trials.flatten.map do |t|
      t.exclusions
    end
    final_exclusions = []
    exclusions.flatten.each do |e|
      if final_exclusions.present?
        is_unique = true
        final_exclusions.each do |fe|
          is_unique = false if fe.id == e.id
        end
        final_exclusions << e if is_unique
      else
        final_exclusions << e
      end
    end
    [trials.flatten.count, final_exclusions]
  end


  def self.matching_trials(condition, current_exclusions, location, range)
    current_exclusions = current_exclusions.split(",").map{|e| e.to_i}
    trials_for_condition(condition)
    if location.empty?
      matching_trials = non_excluded_trials(current_exclusions)
    else
      matching_trials = non_excluded_trials(current_exclusions).select do |t|
          Trial.near(location, range).include?(t)
      end
    end
    matching_trials.each {|t| t.increase_appearance_count}
    matching_trials
  end

  def increase_search_count
    if number_of_searches
      update(number_of_searches: number_of_searches + 1)
    else
      update(number_of_searches: 1)
    end
  end

  private

  def self.trials_for_condition(condition)
    conditions = Condition.where(Condition.arel_table[:name].matches(condition.downcase))
    conditions.each {|c| c.increase_search_count}
    @trials = Set.new
    conditions.each do |c|
      @trials += c.trials
    end
  end

  def self.non_excluded_trials(current_exclusions)
    non_excluded = @trials.select do |t|
      t.exclusions.none? {|e| current_exclusions.include?(e.id)}
    end
  end

end
