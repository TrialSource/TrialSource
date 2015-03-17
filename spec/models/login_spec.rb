require_relative '../spec_helper.rb'

describe Login do
	it "is invalid without an email" do
		 expect(Login.new().valid?).to eq false
	end

	it "is invalid without a password" do
		 expect(Login.new(email: "maria@email.com").valid?).to eq false
	end
end
