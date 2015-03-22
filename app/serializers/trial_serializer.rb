class TrialSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location, :primary_contact_email, :principal, :start_on, :estimated_completed_on,
    :number_of_views, :number_of_appearances, :doctor_id, :archived
    has_many :conditions
end
