class Api::V1::ArchivesController < ApplicationController

  def index
    @trials = Trial.where(archived: true)
  end
end
