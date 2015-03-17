class Login < ActiveRecord::Base
	belongs_to :user, polymorphic: true
	validates_presence_of :email, :password
	has_secure_password

end