class Api::V1::TrialsController < ApplicationController
  before_action :set_trial, only: [:show]

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
    params.require(:trial).permit(:name, :condition, :description, :location, :start_on,
      :estimated_completed_on, :number_of_views, :number_of_appearances, :doctor_id)
  end
end
