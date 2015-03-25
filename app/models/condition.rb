require 'set'

class Condition < ActiveRecord::Base
  has_and_belongs_to_many :trials

  def self.search(query)
    condition = Condition.where(Condition.arel_table[:name].matches(query.downcase)) || Condition.fuzzy_search(query)
    trials = condition.map do |c|
      c.trials
    end
    exclusions = trials.flatten.map do |t|
      t.exclusions
    end
    [trials.flatten.count, exclusions]
  end


  def self.matching_trials(condition, current_exclusions, location)
    current_exclusions = current_exclusions.split(",").map{|e| e.to_i}
    trials_for_condition(condition)
    non_excluded_trials(current_exclusions)
    if location.empty?
      @non_excluded
    else
      @non_excluded.select do |t|
          nearby_trials(location).include?(t)
      end
    end
  end

private

def self.nearby_trials(location)
  Trial.near(location, 50)
end

def self.trials_for_condition(condition)
  conditions = Condition.where(Condition.arel_table[:name].matches(condition.downcase))
  @trials = Set.new
  conditions.each do |c|
    @trials += c.trials
  end
end

def self.non_excluded_trials(current_exclusions)
  @non_excluded = @trials.select do |t|
    t.exclusions.none? {|e| current_exclusions.include?(e.id)}
  end
end

end
