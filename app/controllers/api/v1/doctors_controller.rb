class Api::V1::DoctorsController < ApplicationController
  before_action :set_doctor, only: [:update]


  def create
    doctor= Doctor.new(doctor_params)
    if doctor.save
      render json: doctor
    else
      render json: "Invalid parameters"
    end
  end

  # def show
  #   doctors= doctor.all
  #   render json: doctors
  # end

  def update
    if @doctor.update(doctor_params)
      render json: @doctor
    else
      render json: "Invalid parameters"
    end
  end

  private

  def set_doctor
    @doctor = Doctor.find(params[:id])
  end

  def doctor_params
    params.require(:doctor).permit(:first_name, :last_name, :email, :password_digest, :admin_id)
  end
end