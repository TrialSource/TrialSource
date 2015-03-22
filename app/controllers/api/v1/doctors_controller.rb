class Api::V1::DoctorsController < ApplicationController
  before_action :set_doctor, only: [:update, :show, :destroy]
  before_action :authenticate_user, only: [:create, :update]

  def create
    doctor= Doctor.new(doctor_params)
    if doctor.save
      render json: doctor
    else
      render json: "Invalid parameters"
    end
  end

  def org
    render json: Doctor.where(organization_id: params[:org])
  end


  def index
    doctors= Doctor.all
    render json: doctors
  end

  def show
    render json: @doctor
  end

  def update
    if @doctor.update(doctor_params)
      render json: @doctor
    else
      render json: "Invalid parameters"
    end
  end

  def destroy
    @doctor.destroy
  end
  
  private

  def set_doctor
    @doctor = Doctor.find(params[:id])
  end

  def doctor_params
    params.require(:doctor).permit(:first_name, :last_name, :organization_id, :login_attributes => [:email, :password])
  end
end
