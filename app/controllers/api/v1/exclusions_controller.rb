class Api::V1::ExclusionsController < ApplicationController

  def index
    render json: Exclusion.all
  end
end
