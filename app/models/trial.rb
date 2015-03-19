class Trial < ActiveRecord::Base
  belongs_to :doctor
  validates :name, presence: true
  validates :condition, presence: true
  validates :description, presence: true
  validates :location, presence: true

  def self.current
    Trial.where(:archived == false)
  end

  def self.search(query)
    Trial.current.where(condition: query)
  end
end
