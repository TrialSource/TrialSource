class Api::V1::TrialsController < ApplicationController
  def index
    trials = Trial.all.map do |trial|
      {name: trial.name, condition: trial.condition, description: trial.description, location: trial.location,
        start_on: trial.start_on, estimated_completed_on: trial.estimated_completed_on,
          number_of_views: trial.number_of_views, number_of_appearances: trial.number_of_appearances,
            doctor_id: trial.doctor_id }
    end
    render json: trials
  end

  def create
    trial = Trial.new(trial_params)
    if trial.save
      render json: trial
    else
      render json: "Invalid parameters"
    end
  end

  private

  def trial_params
    params.require(:trial).permit(:name, :condition, :description, :location, :start_on,
      :estimated_completed_on, :number_of_views, :number_of_appearances, :doctor_id)
  end
end
