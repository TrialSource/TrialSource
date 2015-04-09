require 'set'

class Condition < ActiveRecord::Base
  has_and_belongs_to_many :trials

  def self.search(query)
    trials = trials_for_condition(query)
    @conditions.each {|c| c.increase_search_count}
    all_exclusions = find_exclusions(trials)
    exclusions = remove_duplicate_exclusions(all_exclusions)
    [trials.count, exclusions]
  end

  def self.matching_trials(condition, current_exclusions, location, range)
    current_exclusions = current_exclusions.split(",").map{|e| e.to_i}
    trials_for_condition(condition)
    matching_trials = non_excluded_trials(current_exclusions)
    if location.present?
      matching_trials = trials_for_location(matching_trials, location, range)
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

  def self.most_popular
    max = Condition.maximum(:number_of_searches)
    Condition.find_by(number_of_searches: max )
  end


  private

  def self.find_matching_conditions(condition)
    @conditions = Condition.where(Condition.arel_table[:name].matches(condition.downcase))
  end

  def self.trials_for_condition(condition)
    find_matching_conditions(condition)
    @trials = Set.new
    @conditions.each do |c|
      @trials += c.trials
    end
    @trials
  end

  def self.find_exclusions(trials)
    @exclusions = Set.new
    trials.each do |t|
      @exclusions += t.exclusions
    end
    @exclusions
  end

  def self.remove_duplicate_exclusions(exclusions)
    final_exclusions = []
    exclusions.each do |e|
      if final_exclusions.empty?
        final_exclusions << e
      else
        is_unique = true
        final_exclusions.each do |fe|
          is_unique = false if fe.id == e.id
        end
        final_exclusions << e if is_unique
      end
    end
    final_exclusions
  end

  def self.trials_for_location(matching_trials, location, range)
    matching_trials.select do |t|
        Trial.near(location, range).include?(t)
    end
  end

  def self.non_excluded_trials(current_exclusions)
    non_excluded = @trials.select do |t|
      t.exclusions.none? {|e| current_exclusions.include?(e.id)}
    end
  end

end
