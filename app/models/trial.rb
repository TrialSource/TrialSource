class Trial < ActiveRecord::Base
  belongs_to :doctor
  has_and_belongs_to_many :conditions
  has_many :conditions, dependent: :destroy
  has_many :exclusions, dependent: :destroy
  validates :name, presence: true
  validates :description, presence: true
  validates :location, presence: true
  validates :primary_contact_email, presence: true
  validates :principal, presence: true
  validates :active, presence: true

  accepts_nested_attributes_for :conditions

  def self.current
    Trial.where(:archived == false)
  end

  def self.search(query)
    Trial.basic_search(query)
  end
end
