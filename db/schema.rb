# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150323182934) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pg_trgm"

  create_table "conditions", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "conditions_trials", force: :cascade do |t|
    t.integer  "condition_id"
    t.integer  "trial_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "doctors", force: :cascade do |t|
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "organization_id"
  end

  create_table "exclusions", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "exclusions_trials", force: :cascade do |t|
    t.integer  "exclusion_id"
    t.integer  "trial_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "logins", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "user_id"
    t.string   "user_type"
  end

  create_table "organizations", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "org_name"
  end

  create_table "trials", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "location"
    t.date     "start_on"
    t.date     "estimated_completed_on"
    t.integer  "number_of_views"
    t.integer  "number_of_appearances"
    t.integer  "doctor_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.boolean  "archived"
    t.string   "primary_contact_email"
    t.string   "principal"
    t.boolean  "active"
  end

end
