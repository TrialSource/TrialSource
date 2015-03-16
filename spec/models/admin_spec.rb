require 'rails_helper'

RSpec.describe Admin, type: :model do
  it "is invalid without an email" do
    expect(Admin.new().valid?).to eq false
  end

  it "is invalid without a password" do
    expect(Admin.new(email: "ashley@email.com").valid?).to eq false
  end
end
