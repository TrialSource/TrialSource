class Api::V1::ArchivesController < ApplicationController

  def index
    @trials = Trial.order(:name, :doctor_id, estimated_completed_on: :desc)
  end
end
