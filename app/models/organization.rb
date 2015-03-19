class Organization < ActiveRecord::Base
	has_one :login, as: :user
	accepts_nested_attributes_for :login
	has_many :doctors

	def self.search(query)
    Organization.basic_search(query)
  end
end
