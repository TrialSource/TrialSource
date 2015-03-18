require 'rails_helper'

RSpec.describe Doctor, type: :model do
  describe "#search" do
    it "finds results by first name" do
      matching_doctor = Doctor.create(first_name: "Bill")
      _non_matching_doctor = Doctor.create(first_name: "Suzy")

      results = Doctor.search("Bill")

      expect(results).to eq([matching_doctor])
    end

    it "find results by last name" do
      matching_doctor = Doctor.create(last_name: "Smith")
      _non_matching_doctor = Doctor.create(last_name: "Johnson")

      results = Doctor.search("Smith")

      expect(results).to eq([matching_doctor])
    end

    it "finds results for both attributes" do
      first_name_match = Doctor.create(first_name: "Smith")
      last_name_match = Doctor.create(last_name: "Smith")
      _non_matching = Doctor.create(first_name: "Tom")

      results = Doctor.search("Smith")

      expect(results).to match_array([first_name_match, last_name_match])
    end
  end
end
