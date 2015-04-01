class Api::V1::DataController < ApplicationController

  def index
    @conditions = Condition.all
    max = Condition.maximum(:number_of_searches)
    @max = Condition.find_by(number_of_searches: max )
  end

  def org
    @org = Organization.find(params[:org])
    @num_conditions = @org.conditions.count
  end
end
