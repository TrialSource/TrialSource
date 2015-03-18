class Api::V1::SearchesController < ApplicationController

  def show
    render json: Doctor.search(params[:query])
  end
end
