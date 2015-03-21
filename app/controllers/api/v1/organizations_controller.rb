class Api::V1::OrganizationsController < ApplicationController
  before_action :set_organization, only: [:update, :show, :destroy]
  before_action :authenticate_user, only: [:update]

  def create
    organization = Organization.new(organization_params)
    if organization.save
      render json: organization
    else
      render json: "Invalid parameters"
    end
  end

  def show
    render json: @organization
  end

  def update
    if @organization.update(organization_params)
      render json: @organization
    else
      render json: "Invalid parameters"
    end
  end

  def destroy
    @organization.destroy
  end

  private

  def set_organization
    @organization = Organization.find(params[:id])
  end

  def organization_params
    params.require(:organization).permit(:org_name, :login => [:id, :email, :password_digest])
  end
end
