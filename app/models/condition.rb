class Condition < ActiveRecord::Base
  belongs_to :trial

  def self.search(query)
    condition = Condition.where(name: query)
    trials = condition.map do |c|
      Trial.find_by(id: c.trial_id)
    end
  end
end
