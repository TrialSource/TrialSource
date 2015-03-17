require 'rails_helper'

RSpec.describe Api::V1::AdminsController, type: :controller do
	describe "#create" do
	    context "when admin is valid" do
	      it "sends back admin attributes" do
					post :create, admin: {org_name: "Duke", login_attributes: {email: "duke_doctor@example.org", password: "password"}}
    			json = JSON.parse(response.body)
    			expect(json.keys).to include("org_name")
	      end
	    end

		# context "when admin is invalid" do
	  #     it "sends back invalid parameters" do
	  #       post :create, admin: {login_attributes: nil}
    #     	expect(response.status).to eq(400)
	  #     end
	  #   end
	end
end
