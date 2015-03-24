require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :controller do
  describe "#create" do
    it "logs out doctors and organizations" do
      doctor = Doctor.create(first_name: "Bill", login_attributes: {email: "bill@email.com", password: "password"})
      post :create, {email: "bill@email.com", password: "password"}
      expect(session[:user_id]).to eq(doctor.id)
      expect(session[:user_type]).to eq("Doctor")
    end
  end

  describe "#delete" do
    it "logs out doctors and organizations" do
      doctor = Doctor.create(first_name: "Bill", login_attributes: {email: "bill@email.com", password: "password"})
      post :create, {email: "bill@email.com", password: "password"}
      delete :destroy, id: doctor.id
      expect(session[:user_id]).to eq(nil)
      expect(session[:user_type]).to eq(nil)

    end
  end
end
