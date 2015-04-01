class Notification < ActiveRecord::Base
  attr_encrypted :email, :key => ENV['TRIALSOURCE_KEY'], :mode => :per_attribute_iv_and_salt
end
