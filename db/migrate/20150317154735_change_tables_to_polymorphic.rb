class ChangeTablesToPolymorphic < ActiveRecord::Migration
  def change
  	rename_table :users, :logins
  	add_column :logins, :user_id, :integer
  	add_column :logins, :user_type, :string
  	remove_column :admins, :email
  	remove_column :admins, :password_digest
  	remove_column :doctors, :email
  	remove_column :doctors, :password_digest
  	rename_column :admins, :hospital_name, :org_name
  end
end
