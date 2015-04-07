require_relative '../spec_helper.rb'

describe Login do
	it "is invalid without an email" do
		 expect(build(:login, email: nil).valid?).to eq false
	end

	it "is invalid without a password" do
		 expect(build(:login, password: nil).valid?).to eq false
	end
end
