class TrialSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location, :start_on, :estimated_completed_on, :number_of_views,
    :number_of_appearances, :doctor_id, :archived, :primary_contact_email, :principal, :active, :organization
  has_many :conditions
  has_many :exclusions

  def organization
    id = object.doctor && object.doctor.organization.id
    name = object.doctor && object.doctor.organization.org_name if
    {id: id, name: name}
  end
end
