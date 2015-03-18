class Api::V1::SearchesController < ApplicationController

  def show
    type= params[:type].capitalize.constantize
    render json: type.search(params[:query])
  end
end
