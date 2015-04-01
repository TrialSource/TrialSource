class Api::V1::TrialsController < ApplicationController
  before_action :set_trial, only: [:update, :destroy, :show, :views]
  before_action :authenticate_user, only: [:create, :update]

  def index
    render json: Trial.current
  end

  def create
    @trial = Trial.new(trial_params)
    @notifications = []
    @trial.conditions.each do |condition|
      @notifications << (Notification.where(condition: condition.name))
      @notifications << (Notification.where(condition_id: condition.id))
    end
    @trial.exclusions.each do |exclusion|
      @notifications << (Notification.where(exclusion_ids: exclusion.id))
    end
    #emails = @notifications.first.map {|n| n.email} if @notifications.present?
      if @trial.save
        @notifications.first.each do |notification|
          NotificationMailer.notification_email(notification).deliver_now if @notifications.present?
        end
        render json: @trial
      else
        render json: "Invalid parameters"
      end
  end

  def show
    render json: @trial
  end

  def views
    @trial.increase_view_count
    render json: @trial
  end


  def doctor
    render json: Trial.where(doctor_id: params[:doctor])
  end

  def org
    org = Organization.find(params[:org])
    render json: org.trials
  end

  def update
    if @trial.update(trial_params)
      render json: @trial
    else
      render json: "Invalid parameters"
    end
  end

  def destroy
    @trial.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def set_trial
    @trial = Trial.find(params[:id])
  end

  def trial_params
    params.require(:trial).permit(:name, :description, :location, :latitude, :longitude, :start_on,
      :estimated_completed_on, :number_of_views, :number_of_appearances, :doctor_id,
      :archived, :primary_contact_email, :principal, :active, :condition_ids => [],
      :conditions_attributes => [:id, :name, :trial_id], :exclusion_ids => [],
      :exclusions_attributes => [:id, :name])
  end
end
