require_relative '../spec_helper.rb'

describe User do
	it "is invalid without an email" do
		hospital = User.new()
		expect(User.count).to eq(0)
	end
end
