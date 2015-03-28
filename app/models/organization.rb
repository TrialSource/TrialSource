class Organization < ActiveRecord::Base
	has_one :login, as: :user, dependent: :destroy
	accepts_nested_attributes_for :login
	has_many :doctors
	has_many :trials, :through => :doctors
	has_many :conditions, :through => :trials

	def self.search(query)
    Organization.basic_search(query)
  end
end
