class Api::V1::DataController < ApplicationController

  def index
    @conditions = Condition.all
    @max = Condition.order("number_of_searches ASC").first
  end

  def org
    @org = Organization.find(params[:org])
    @num_conditions = @org.conditions.count
  end
end
