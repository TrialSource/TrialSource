class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :org_name
  has_one :login
end
