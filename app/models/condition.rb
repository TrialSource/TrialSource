class Condition < ActiveRecord::Base
  belongs_to :trial

  def self.search(query)
    condition = Condition.find_by(name: query)
    return Trial.where(id: condition.trial_id)
  end
end
