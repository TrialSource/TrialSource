class Condition < ActiveRecord::Base
  belongs_to :trial

  def self.search(query)
    condition = Condition.where(Condition.arel_table[:name].matches(query.downcase)) || Condition.fuzzy_search(query)
    trials = condition.map do |c|
      Trial.find_by(id: c.trial_id)
    end
  end
end
