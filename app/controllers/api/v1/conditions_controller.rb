class Api::V1::ConditionsController < ApplicationController
  before_action :set_condition, only: [:update]

  def index
    render json: [number_of_trials, Condition.all]
  end

  def create
    condition = Condition.new(condition_params)
    if condition.save
      render json: condition
    else
      render json: "Invalid parameters"
    end
  end

  def trials
    render json: Condition.included_trials(params[:condition], params[:exclusions])
  end

  def update
    if @condition.update(condition_params)
      render json: @condition
    else
      render json: "Invalid parameters"
    end
  end

  private

  def set_condition
    @condition = Condition.find(params[:id])
  end

  def condition_params
    params.require(:condition).permit(:name, :trial_id)
  end
end
