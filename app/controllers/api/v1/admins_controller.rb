class Api::V1::AdminsController < ApplicationController
  before_action :set_admin, only: [:update]


  def create
    admin= Admin.new(admin_params)
    if admin.save
      render json: admin
    else
      render json: "Invalid parameters"
    end
  end

  # def show
  #   admins= Admin.all
  #   render json: admins
  # end

  def update
    if @admin.update(admin_params)
      render json: @admin
    else
      render json: "Invalid parameters"
    end
  end

  private

  def set_admin
    @admin = admin.find(params[:id])
  end

  def admin_params
    params.require(:admin).permit(:hospital_name, :email, :password_digest)
  end
end