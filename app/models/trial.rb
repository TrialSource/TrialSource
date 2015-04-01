class Trial < ActiveRecord::Base
  belongs_to :doctor
  has_and_belongs_to_many :conditions
  has_and_belongs_to_many :exclusions
  validates :name, presence: true
  validates :description, presence: true
  validates :location, presence: true
  validates :primary_contact_email, presence: true
  validates :principal, presence: true
  geocoded_by :location
  after_validation :geocode, :if => :location_changed?

  accepts_nested_attributes_for :conditions
  accepts_nested_attributes_for :exclusions



  def self.current
    Trial.where(:archived == false)
  end

  def increase_appearance_count
    if number_of_appearances
      update(number_of_appearances: number_of_appearances + 1)
    else
      update(number_of_appearances: 1)
    end
  end

  def increase_view_count
    if number_of_views
      update(number_of_views: number_of_views + 1)
    else
      update(number_of_views: 1)
    end
  end

  def self.search(query)
    Trial.basic_search(query)
  end
end
