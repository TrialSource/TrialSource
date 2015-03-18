class Trial < ActiveRecord::Base
  belongs_to :doctor
  validates :name, presence: true
  validates :condition, presence: true
  validates :description, presence: true
  validates :location, presence: true

  def self.search(query)
    Trial.basic_search(query)
  end
end
