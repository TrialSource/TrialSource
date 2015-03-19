class Doctor < ActiveRecord::Base
  has_many :trials
	has_one :login, as: :user
	accepts_nested_attributes_for :login
  belongs_to :organization


  def self.search(query)
    Doctor.basic_search(query)
  end
end
