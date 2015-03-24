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
    included_trials = []
    condition = Condition.where(Condition.arel_table[:name].matches(condition.downcase))
    trials = condition.map do |c|
      c.trials
    end
    trials.each do |t|
      if t.first.exclusions.presence
        t.first.exclusions.each do |e|
          included_trials << t unless current_exclusions.include?(e.id)
        end
      else
        included_trials << t.first
      end
    end
    included_trials
  end

end
