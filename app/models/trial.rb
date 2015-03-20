class Trial < ActiveRecord::Base
  belongs_to :doctor
  has_many :conditions
  accepts_nested_attributes_for :conditions
  validates :name, presence: true
  validates :description, presence: true
  validates :location, presence: true

  def self.current
    Trial.where(:archived == false)
  end

  def self.search(query)
    Trial.basic_search(query)
  end
end
