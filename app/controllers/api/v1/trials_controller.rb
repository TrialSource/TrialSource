class Api::V1::TrialsController < ApplicationController
  before_action :set_trial, only: [:update]

  def index
    render json: Trial.current
  end

  def create
    trial = Trial.new(trial_params)
    if trial.save
      render json: trial
    else
      render json: "Invalid parameters"
    end
  end

  def doctor
    render json: Trial.where(doctor_id: params[:doctor])
  end

  def org
    org = Organization.find(params[:org])
    doctors = Doctor.where(organization_id = org.id)
    trials = []
    doctors.each do |doctor|
      trials << Trial.where(doctor_id: doctor.id)
    end

    render json: trials
  end
  def update
    if @trial.update(trial_params)
      render json: @trial
    else
      render json: "Invalid parameters"
    end
  end


  private

  def set_trial
    @trial = Trial.find(params[:id])
  end

  def trial_params
    params.require(:trial).permit(:name, :description, :location, :start_on,
      :estimated_completed_on, :number_of_views, :number_of_appearances, :doctor_id,
      :conditions_attributes => [:id, :name, :trial_id] )
  end
end
