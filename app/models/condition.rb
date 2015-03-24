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

  def self.included_trials(condition, current_exclusions)
    current_exclusions = current_exclusions.split(",").map{|e| e.to_i}
    conditions = Condition.where(Condition.arel_table[:name].matches(condition.downcase))
    trials = Set.new
    conditions.each do |c|
      trials += c.trials
    end
    trials.select do |t|
      t.exclusions.none? {|e| current_exclusions.include?(e.id)}
    end
  end

end
