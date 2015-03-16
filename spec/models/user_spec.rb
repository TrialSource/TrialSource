require_relative '../spec_helper.rb'

describe User do
	it "is invalid without an email" do
		 expect(User.new().valid?).to eq false

	end

	it "is invalid without a password" do
		 expect(User.new(email: "maria@email.com").valid?).to eq false
	end


end
