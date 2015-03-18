require 'rails_helper'

RSpec.describe Api::V1::OrganizationsController, type: :controller do
	describe "#create" do
	    context "when organization is valid" do
	      it "sends back organization attributes" do
					post :create, organization: {org_name: "Duke",
						login_attributes: {email: "duke_doctor@example.org", password: "password"}}
					json = JSON.parse(response.body)
					org = json["organization"]
					expect(org["org_name"]).to eq("Duke")
	      end
	    end

		# context "when organization is invalid" do
	  #     it "sends back invalid parameters" do
	  #       post :create, organization: {login_attributes: nil}
    #     	expect(response.status).to eq(400)
	  #     end
	  #   end
	end
end
