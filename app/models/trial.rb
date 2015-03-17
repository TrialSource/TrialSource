class Trial < ActiveRecord::Base
  validates :name, presence: true
  validates :condition, presence: true
  validates :description, presence: true
  validates :location, presence: true
  validates :doctor_id, uniqueness: true
end
