class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :encrypted_email
      t.string :encrypted_email_salt
      t.string :encrypted_email_iv
      t.string :condition
      t.integer :condition_id
      t.integer :exclusion_ids

      t.timestamps null: false
    end
  end
end
