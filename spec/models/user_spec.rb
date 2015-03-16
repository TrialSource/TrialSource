require_relative '../spec_helper.rb'

describe User do
	it "is invalid without an email" do
		hospital = User.create()
		expect(User.count).to eq(0)
	end

	it "is invalid without a password" do
		hospital = User.create(email: "maria@email.com")
		expect(User.count).to eq(0)
	end
end
