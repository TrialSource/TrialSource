class Condition < ActiveRecord::Base
  belongs_to :trial

  def self.search(query)
    condition = Condition.find_by(name: query)
    Trial.where(id: condition.id)
  end
end
