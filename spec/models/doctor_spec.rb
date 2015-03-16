require 'rails_helper'

RSpec.describe Doctor, type: :model do
  it "is invalid without an email" do
    expect(Doctor.new().valid?).to eq false
  end

  it "is invalid without a password" do
    expect(Doctor.new(email: "ben@email.com").valid?).to eq false
  end
end
