class ChangeAdminToOrganization < ActiveRecord::Migration
  def change
    rename_table :admins, :organizations
    rename_column :doctors, :admin_id, :organization_id
  end
end
