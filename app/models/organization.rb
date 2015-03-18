class Organization < ActiveRecord::Base
	has_one :login, as: :user
	accepts_nested_attributes_for :login

end
